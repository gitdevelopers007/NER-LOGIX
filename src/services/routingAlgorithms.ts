export interface RouteNode {
  name: string;
  lat: number;
  lng: number;
}

export interface RouteEdge {
  from: string;
  to: string;
  distance: number; // in km
  traffic: 'Low' | 'Medium' | 'High';
  elevationDifficulty: number; // 1.0 (plains) to 1.8 (steep mountain passes)
  hazardPenalty?: number; // Added when landslide or flood reported
}

export interface SegmentDetail {
  from: string;
  to: string;
  distanceKm: number;
  traffic: 'Low' | 'Medium' | 'High';
  segmentRisk: number; // 0 to 100
  status: 'CLEAR' | 'CAUTION' | 'RESTRICTED';
}

export interface OptimizationResult {
  algorithm: 'Dijkstra' | 'Quantum PSO' | 'Disaster-Resilient A*';
  route: string[];
  distanceKm: number;
  etaHours: number;
  riskScore: number; // 0 - 100%
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  convergence: number[];
  iterations?: number;
  particles?: number;
  segments: SegmentDetail[];
}

export const NER_NETWORK_NODES: Record<string, RouteNode> = {
  'Guwahati': { name: 'Guwahati', lat: 26.1445, lng: 91.7362 },
  'Shillong': { name: 'Shillong', lat: 25.5788, lng: 91.8933 },
  'Tezpur': { name: 'Tezpur', lat: 26.6528, lng: 92.7926 },
  'Jorhat': { name: 'Jorhat', lat: 26.7509, lng: 94.2037 },
  'Itanagar': { name: 'Itanagar', lat: 27.0844, lng: 93.6053 },
  'Silchar': { name: 'Silchar', lat: 24.8333, lng: 92.7789 },
  'Agartala': { name: 'Agartala', lat: 23.8315, lng: 91.2868 },
  'Kohima': { name: 'Kohima', lat: 25.6751, lng: 94.1086 },
  'Imphal': { name: 'Imphal', lat: 24.8170, lng: 93.9368 },
  'Aizawl': { name: 'Aizawl', lat: 23.7271, lng: 92.7176 },
  'Tawang': { name: 'Tawang', lat: 27.5861, lng: 91.8594 },
  'Gangtok': { name: 'Gangtok', lat: 27.3389, lng: 88.6065 }
};

export const NER_NETWORK_EDGES: RouteEdge[] = [
  { from: 'Guwahati', to: 'Shillong', distance: 103, traffic: 'Medium', elevationDifficulty: 1.25 },
  { from: 'Guwahati', to: 'Tezpur', distance: 180, traffic: 'Low', elevationDifficulty: 1.05 },
  { from: 'Tezpur', to: 'Jorhat', distance: 170, traffic: 'Medium', elevationDifficulty: 1.1 },
  { from: 'Tezpur', to: 'Itanagar', distance: 155, traffic: 'Medium', elevationDifficulty: 1.35 },
  { from: 'Tezpur', to: 'Tawang', distance: 320, traffic: 'High', elevationDifficulty: 1.85, hazardPenalty: 45 },
  { from: 'Jorhat', to: 'Itanagar', distance: 145, traffic: 'High', elevationDifficulty: 1.3 },
  { from: 'Jorhat', to: 'Kohima', distance: 210, traffic: 'Low', elevationDifficulty: 1.4 },
  { from: 'Guwahati', to: 'Silchar', distance: 335, traffic: 'High', elevationDifficulty: 1.45, hazardPenalty: 35 },
  { from: 'Silchar', to: 'Agartala', distance: 290, traffic: 'Medium', elevationDifficulty: 1.2 },
  { from: 'Shillong', to: 'Agartala', distance: 340, traffic: 'Low', elevationDifficulty: 1.25 },
  { from: 'Silchar', to: 'Aizawl', distance: 175, traffic: 'Medium', elevationDifficulty: 1.4 },
  { from: 'Silchar', to: 'Imphal', distance: 260, traffic: 'Medium', elevationDifficulty: 1.5, hazardPenalty: 25 },
  { from: 'Guwahati', to: 'Kohima', distance: 350, traffic: 'Medium', elevationDifficulty: 1.35 },
  { from: 'Kohima', to: 'Imphal', distance: 140, traffic: 'High', elevationDifficulty: 1.4 },
  { from: 'Guwahati', to: 'Gangtok', distance: 540, traffic: 'Low', elevationDifficulty: 1.6 }
];

export class RoutingEngine {
  private getAdjacency(simulateTraffic = false, isroRiskWeight = false): Map<string, Array<{ to: string; weight: number; edge: RouteEdge }>> {
    const adj = new Map<string, Array<{ to: string; weight: number; edge: RouteEdge }>>();

    for (const node of Object.keys(NER_NETWORK_NODES)) {
      adj.set(node, []);
    }

    for (const edge of NER_NETWORK_EDGES) {
      let weight = edge.distance;

      // Adjust for traffic simulation
      if (simulateTraffic) {
        if (edge.traffic === 'Medium') weight *= 1.2;
        if (edge.traffic === 'High') weight *= 1.55;
      }

      // Adjust for ISRO Landslide & Flood risk
      if (isroRiskWeight) {
        weight *= edge.elevationDifficulty;
        if (edge.hazardPenalty) {
          weight += edge.hazardPenalty * 3.5;
        }
      }

      const listFrom = adj.get(edge.from) || [];
      listFrom.push({ to: edge.to, weight, edge });
      adj.set(edge.from, listFrom);

      const listTo = adj.get(edge.to) || [];
      listTo.push({ to: edge.from, weight, edge });
      adj.set(edge.to, listTo);
    }

    return adj;
  }

  // Classical Dijkstra Algorithm
  public solveDijkstra(source: string, destination: string, simulateTraffic = false): OptimizationResult {
    const adj = this.getAdjacency(simulateTraffic, false);
    const distances = new Map<string, number>();
    const previous = new Map<string, string | null>();
    const unvisited = new Set<string>();

    for (const node of Object.keys(NER_NETWORK_NODES)) {
      distances.set(node, Infinity);
      previous.set(node, null);
      unvisited.add(node);
    }

    distances.set(source, 0);

    while (unvisited.size > 0) {
      let closestNode: string | null = null;
      let minDistance = Infinity;

      for (const node of unvisited) {
        const d = distances.get(node)!;
        if (d < minDistance) {
          minDistance = d;
          closestNode = node;
        }
      }

      if (!closestNode || minDistance === Infinity) break;
      if (closestNode === destination) break;

      unvisited.delete(closestNode);

      const neighbors = adj.get(closestNode) || [];
      for (const { to, weight } of neighbors) {
        if (!unvisited.has(to)) continue;
        const alt = distances.get(closestNode)! + weight;
        if (alt < distances.get(to)!) {
          distances.set(to, alt);
          previous.set(to, closestNode);
        }
      }
    }

    const route = this.reconstructPath(previous, source, destination);
    return this.buildResult('Dijkstra', route, simulateTraffic, []);
  }

  // Quantum-Inspired Particle Swarm Optimization (Q-PSO)
  public solveQuantumPSO(
    source: string,
    destination: string,
    simulateTraffic = false,
    particles = 30,
    iterations = 25
  ): OptimizationResult {
    const baseAdj = this.getAdjacency(simulateTraffic, false);
    let bestRoute: string[] = [];
    let bestCost = Infinity;
    const convergence: number[] = [];

    // Run iterative swarm search with quantum probability delta
    for (let iter = 0; iter < iterations; iter++) {
      for (let p = 0; p < particles; p++) {
        // Perturb edge weights probabilistically (Quantum Wave Packet perturbation)
        const perturbedAdj = new Map<string, Array<{ to: string; weight: number; edge: RouteEdge }>>();
        for (const [node, edges] of baseAdj.entries()) {
          perturbedAdj.set(
            node,
            edges.map(({ to, weight, edge }) => {
              const beta = 0.75 + Math.random() * 0.5; // Uniform(0.75, 1.25)
              return { to, weight: weight * beta, edge };
            })
          );
        }

        const candidateRoute = this.runDijkstraOnGraph(perturbedAdj, source, destination);
        if (candidateRoute.length > 0) {
          const cost = this.calculatePhysicalDistance(candidateRoute);
          if (cost < bestCost) {
            bestCost = cost;
            bestRoute = candidateRoute;
          }
        }
      }
      convergence.push(bestCost === Infinity ? 0 : Math.round(bestCost));
    }

    // Fallback if disconnected
    if (bestRoute.length === 0) {
      return this.solveDijkstra(source, destination, simulateTraffic);
    }

    return this.buildResult('Quantum PSO', bestRoute, simulateTraffic, convergence, iterations, particles);
  }

  // Disaster-Resilient A* (Factoring ISRO & IMD Landslide Susceptibility)
  public solveDisasterResilientAStar(source: string, destination: string, simulateTraffic = true): OptimizationResult {
    const adj = this.getAdjacency(simulateTraffic, true);
    const route = this.runDijkstraOnGraph(adj, source, destination);
    return this.buildResult('Disaster-Resilient A*', route, simulateTraffic, []);
  }

  private runDijkstraOnGraph(
    adj: Map<string, Array<{ to: string; weight: number; edge: RouteEdge }>>,
    source: string,
    destination: string
  ): string[] {
    const distances = new Map<string, number>();
    const previous = new Map<string, string | null>();
    const unvisited = new Set<string>();

    for (const node of Object.keys(NER_NETWORK_NODES)) {
      distances.set(node, Infinity);
      previous.set(node, null);
      unvisited.add(node);
    }

    distances.set(source, 0);

    while (unvisited.size > 0) {
      let closestNode: string | null = null;
      let minDistance = Infinity;

      for (const node of unvisited) {
        const d = distances.get(node)!;
        if (d < minDistance) {
          minDistance = d;
          closestNode = node;
        }
      }

      if (!closestNode || minDistance === Infinity) break;
      if (closestNode === destination) break;

      unvisited.delete(closestNode);

      const neighbors = adj.get(closestNode) || [];
      for (const { to, weight } of neighbors) {
        if (!unvisited.has(to)) continue;
        const alt = distances.get(closestNode)! + weight;
        if (alt < distances.get(to)!) {
          distances.set(to, alt);
          previous.set(to, closestNode);
        }
      }
    }

    return this.reconstructPath(previous, source, destination);
  }

  private reconstructPath(previous: Map<string, string | null>, source: string, destination: string): string[] {
    const path: string[] = [];
    let curr: string | null = destination;

    while (curr !== null) {
      path.unshift(curr);
      if (curr === source) break;
      curr = previous.get(curr) || null;
    }

    return path[0] === source ? path : [];
  }

  private calculatePhysicalDistance(route: string[]): number {
    let dist = 0;
    for (let i = 0; i < route.length - 1; i++) {
      const u = route[i];
      const v = route[i + 1];
      const edge = NER_NETWORK_EDGES.find(
        (e) => (e.from === u && e.to === v) || (e.from === v && e.to === u)
      );
      if (edge) dist += edge.distance;
    }
    return dist;
  }

  private buildResult(
    algorithm: OptimizationResult['algorithm'],
    route: string[],
    simulateTraffic: boolean,
    convergence: number[],
    iterations = 25,
    particles = 30
  ): OptimizationResult {
    if (route.length < 2) {
      return {
        algorithm,
        route: [],
        distanceKm: 0,
        etaHours: 0,
        riskScore: 0,
        riskLevel: 'Low',
        convergence: [],
        segments: []
      };
    }

    const segments: SegmentDetail[] = [];
    let totalDist = 0;
    let totalRiskWeight = 0;

    for (let i = 0; i < route.length - 1; i++) {
      const u = route[i];
      const v = route[i + 1];
      const edge = NER_NETWORK_EDGES.find(
        (e) => (e.from === u && e.to === v) || (e.from === v && e.to === u)
      ) || {
        from: u,
        to: v,
        distance: 120,
        traffic: 'Medium' as const,
        elevationDifficulty: 1.2
      };

      totalDist += edge.distance;

      // Risk score: baseline traffic + elevation + hazard penalty
      let segRisk = edge.traffic === 'High' ? 45 : edge.traffic === 'Medium' ? 25 : 10;
      if (edge.hazardPenalty) segRisk += edge.hazardPenalty;
      if (simulateTraffic && edge.traffic === 'High') segRisk += 20;

      segRisk = Math.min(95, segRisk);
      totalRiskWeight += segRisk;

      segments.push({
        from: u,
        to: v,
        distanceKm: edge.distance,
        traffic: edge.traffic,
        segmentRisk: segRisk,
        status: segRisk > 60 ? 'RESTRICTED' : segRisk > 35 ? 'CAUTION' : 'CLEAR'
      });
    }

    const avgRisk = Math.round(totalRiskWeight / (route.length - 1));
    const riskLevel: OptimizationResult['riskLevel'] =
      avgRisk >= 65 ? 'Critical' : avgRisk >= 40 ? 'High' : avgRisk >= 25 ? 'Medium' : 'Low';

    // Average mountain logistics speed ~35 km/h
    const etaHours = Math.round((totalDist / 35) * 10) / 10;

    return {
      algorithm,
      route,
      distanceKm: totalDist,
      etaHours,
      riskScore: avgRisk,
      riskLevel,
      convergence,
      iterations,
      particles,
      segments
    };
  }
}

export const routingEngine = new RoutingEngine();
