import React, { useState } from 'react';
import { X, Package } from 'lucide-react';
import type { CargoType, MissionPriority } from '../../types/logistics';
import { logisticsService } from '../../services/logisticsService';

interface CreateMissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export const CreateMissionModal: React.FC<CreateMissionModalProps> = ({
  isOpen,
  onClose,
  onCreated
}) => {
  const [cargoType, setCargoType] = useState<CargoType>('MEDICINES');
  const [cargoDesc, setCargoDesc] = useState('Critical Medical Supplies & Antibiotics');
  const [quantity, setQuantity] = useState<number>(100);
  const [unit, setUnit] = useState('boxes');
  const [priority, setPriority] = useState<MissionPriority>('HIGH');

  const [originName, setOriginName] = useState('Guwahati Central Depot');
  const [destName, setDestName] = useState('Nongpoh Community Health Center');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    logisticsService.createMission({
      cargo_type: cargoType,
      cargo_description: cargoDesc,
      cargo_quantity: Number(quantity),
      cargo_unit: unit,
      priority: priority,
      origin: {
        name: originName,
        latitude: 26.1584,
        longitude: 91.7705,
        state: 'Assam'
      },
      destination: {
        name: destName,
        latitude: 25.9015,
        longitude: 91.8810,
        state: 'Meghalaya'
      }
    });
    onCreated();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 space-y-4 border border-slate-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Create Supply Mission</h3>
              <p className="text-[11px] text-slate-500">Dispatch essential commodities or medical relief</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Cargo Commodity</label>
              <select
                value={cargoType}
                onChange={(e) => setCargoType(e.target.value as CargoType)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-800 font-medium"
              >
                <option value="MEDICINES">Medicines & Vaccines</option>
                <option value="ESSENTIAL_COMMODITIES">Essential Commodities</option>
                <option value="AGRICULTURAL_PRODUCE">Agricultural Produce</option>
                <option value="CONSTRUCTION_MATERIALS">Construction Materials</option>
                <option value="OTHER">Other Relief Equipment</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Priority Level</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as MissionPriority)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-800 font-medium"
              >
                <option value="CRITICAL">CRITICAL (Emergency)</option>
                <option value="HIGH">HIGH Priority</option>
                <option value="NORMAL">NORMAL Standard</option>
                <option value="LOW">LOW</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">Manifest Description</label>
            <input
              type="text"
              value={cargoDesc}
              onChange={(e) => setCargoDesc(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-800"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-800"
                min="1"
                required
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Unit</label>
              <input
                type="text"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-800"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1 border-t border-slate-100">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Origin Hub</label>
              <input
                type="text"
                value={originName}
                onChange={(e) => setOriginName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-800"
                required
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Destination</label>
              <input
                type="text"
                value={destName}
                onChange={(e) => setDestName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-800"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs cursor-pointer"
            >
              Dispatch Mission
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
