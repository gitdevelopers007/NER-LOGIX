import React, { useState } from 'react';
import { 
  Camera, Upload, Trash2, 
  CheckCircle2, ArrowRight, ShieldCheck, 
  Sliders, RefreshCw, Send
} from 'lucide-react';
import { 
  compressImage, 
  detectOptimalCompressionMode, 
  type CompressionMode, 
  type CompressedImageResult 
} from '../utils/imageCompressor';
import { incidentService } from '../../services/incidentService';

interface LowBandwidthPhotoUploaderProps {
  onPhotoReady: (result: CompressedImageResult) => void;
  onPhotoCleared: () => void;
  currentPhoto: CompressedImageResult | null;
  incidentType: string;
  roadName: string;
  districtName: string;
}

export const LowBandwidthPhotoUploader: React.FC<LowBandwidthPhotoUploaderProps> = ({
  onPhotoReady,
  onPhotoCleared,
  currentPhoto,
  incidentType,
  roadName,
  districtName
}) => {
  const [mode, setMode] = useState<CompressionMode>(detectOptimalCompressionMode());
  const [rawFile, setRawFile] = useState<File | null>(null);
  const [compressing, setCompressing] = useState(false);
  const [simulateTransfer, setSimulateTransfer] = useState(false);
  const [transferProgress, setTransferProgress] = useState(0);
  const [deliveryConfirmed, setDeliveryConfirmed] = useState(false);

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const cameraInputRef = React.useRef<HTMLInputElement>(null);

  const processFile = async (file: File, selectedMode: CompressionMode) => {
    setCompressing(true);
    try {
      const result = await compressImage(file, selectedMode);
      onPhotoReady(result);
    } catch (err: any) {
      alert(err.message || 'Error processing photo');
    } finally {
      setCompressing(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setRawFile(file);
    setDeliveryConfirmed(false);
    await processFile(file, mode);
  };

  const handleModeChange = async (newMode: CompressionMode) => {
    setMode(newMode);
    if (rawFile) {
      await processFile(rawFile, newMode);
    }
  };

  const runSimulatedTransfer = () => {
    if (!currentPhoto) return;
    setSimulateTransfer(true);
    setTransferProgress(0);

    let current = 0;
    const interval = setInterval(() => {
      current += 15;
      if (current >= 100) {
        clearInterval(interval);
        setTransferProgress(100);
        setDeliveryConfirmed(true);
        setSimulateTransfer(false);

        // Forward to Command Center Incident Service directly
        incidentService.ingestFieldPhotoIncident({
          id: `INC-FLD-${Date.now().toString().slice(-4)}`,
          type: incidentType || 'LANDSLIDE',
          title: `Field Photo: ${incidentType.replace('_', ' ')} on ${roadName || 'NH-13'}`,
          state: 'Arunachal Pradesh',
          district: districtName || 'Lower Subansiri',
          road: roadName || 'NH-13 KM-142',
          latitude: 27.4285,
          longitude: 93.7542,
          photoUrl: currentPhoto.base64Data,
          photoMetadata: {
            uploaded: 'Just Now',
            gpsVerified: true,
            source: 'Field Operator Mobile PWA (Low-Bandwidth Pipeline)',
            originalSize: `${(currentPhoto.originalSize / (1024 * 1024)).toFixed(2)} MB`,
            compressedSize: `${(currentPhoto.compressedSize / 1024).toFixed(1)} KB`,
            bandwidthSaved: currentPhoto.compressionRatio,
            compressionMode: currentPhoto.compressionMode,
            transferStatus: 'RECEIVED',
            transferSpeedEstimate: '~12 KB/min (2G Mountain Corridor Link)',
            transferDurationSecs: currentPhoto.estimatedTransferTimeSecs
          }
        });
      } else {
        setTransferProgress(current);
      }
    }, 400);
  };

  return (
    <div className="space-y-3">
      {/* Hidden native camera/file inputs */}
      <input
        type="file"
        ref={cameraInputRef}
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
      />
      <input
        type="file"
        ref={fileInputRef}
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* COMPRESSION MODE SELECTOR */}
      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-blue-600" />
            Adaptive Bandwidth Preset
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300">
            ~12 KB/min 2G LINK
          </span>
        </div>

        <div className="grid grid-cols-3 gap-1.5 text-center">
          <button
            type="button"
            onClick={() => handleModeChange('EMERGENCY')}
            className={`p-2 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
              mode === 'EMERGENCY'
                ? 'bg-blue-600 text-white border-blue-700 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="font-bold text-[11px]">Emergency</div>
            <div className={`text-[9.5px] ${mode === 'EMERGENCY' ? 'text-blue-100' : 'text-slate-500'}`}>
              20–40 KB
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleModeChange('LOW')}
            className={`p-2 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
              mode === 'LOW'
                ? 'bg-blue-600 text-white border-blue-700 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="font-bold text-[11px]">Low Bandwidth</div>
            <div className={`text-[9.5px] ${mode === 'LOW' ? 'text-blue-100' : 'text-slate-500'}`}>
              50–100 KB
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleModeChange('NORMAL')}
            className={`p-2 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
              mode === 'NORMAL'
                ? 'bg-blue-600 text-white border-blue-700 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="font-bold text-[11px]">Normal</div>
            <div className={`text-[9.5px] ${mode === 'NORMAL' ? 'text-blue-100' : 'text-slate-500'}`}>
              150–300 KB
            </div>
          </button>
        </div>
      </div>

      {/* CAPTURE BUTTONS (If no photo captured yet) */}
      {!currentPhoto && (
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => cameraInputRef.current?.click()}
            className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-300 rounded-xl hover:border-blue-500 hover:bg-blue-50/50 transition-colors group cursor-pointer bg-white"
          >
            <Camera className="w-6 h-6 text-slate-400 group-hover:text-blue-600 mb-1" />
            <span className="text-xs font-bold text-slate-700">Capture Camera</span>
            <span className="text-[10px] text-slate-400">Direct mobile lens</span>
          </button>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-300 rounded-xl hover:border-blue-500 hover:bg-blue-50/50 transition-colors group cursor-pointer bg-white"
          >
            <Upload className="w-6 h-6 text-slate-400 group-hover:text-blue-600 mb-1" />
            <span className="text-xs font-bold text-slate-700">Select Gallery Photo</span>
            <span className="text-[10px] text-slate-400">JPG, PNG, WebP</span>
          </button>
        </div>
      )}

      {/* COMPRESSING INDICATOR */}
      {compressing && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-center gap-3 text-blue-800 text-xs font-semibold animate-pulse">
          <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
          <span>Downscaling &amp; Re-encoding via WebP/JPEG pipeline...</span>
        </div>
      )}

      {/* COMPRESSED PHOTO PREVIEW & PIPELINE VISUALIZATION */}
      {currentPhoto && !compressing && (
        <div className="space-y-3">
          {/* Image Thumbnail & Delete */}
          <div className="relative rounded-xl overflow-hidden border border-slate-300 bg-slate-900 group shadow-xs">
            <img
              src={currentPhoto.base64Data}
              alt="Field evidence"
              className="w-full h-48 object-cover opacity-90"
            />
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-xs text-white text-[10px] font-mono font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{currentPhoto.compressionMode} MODE</span>
            </div>

            <button
              type="button"
              onClick={() => {
                onPhotoCleared();
                setRawFile(null);
                setDeliveryConfirmed(false);
              }}
              className="absolute top-2 right-2 bg-red-600/90 text-white p-1.5 rounded-full shadow-md hover:bg-red-700 transition-colors cursor-pointer"
              title="Remove photo"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* BEFORE & AFTER BANDWIDTH METRIC BOX */}
          <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-emerald-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Adaptive Low-Bandwidth Optimization
              </span>
              <span className="text-[10.5px] font-mono font-bold text-emerald-800 bg-emerald-200/70 px-2 py-0.2 rounded-full">
                {currentPhoto.compressionRatio} Saved
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-mono">
              <div className="p-2 bg-white rounded-lg border border-emerald-100">
                <span className="text-[10px] text-slate-400 block font-sans uppercase">Original Size</span>
                <span className="font-bold text-slate-800">
                  {(currentPhoto.originalSize / (1024 * 1024)).toFixed(2)} MB
                </span>
              </div>

              <div className="p-2 bg-white rounded-lg border border-emerald-100">
                <span className="text-[10px] text-emerald-600 block font-sans uppercase font-bold">Optimized Size</span>
                <span className="font-black text-emerald-800 text-sm">
                  {(currentPhoto.compressedSize / 1024).toFixed(1)} KB
                </span>
              </div>

              <div className="p-2 bg-white rounded-lg border border-emerald-100">
                <span className="text-[10px] text-slate-400 block font-sans uppercase">Channel Speed</span>
                <span className="font-bold text-slate-800">
                  ~12 KB/min
                </span>
              </div>

              <div className="p-2 bg-white rounded-lg border border-emerald-100">
                <span className="text-[10px] text-slate-400 block font-sans uppercase">Est. Transfer</span>
                <span className="font-bold text-slate-800">
                  ~{Math.round(currentPhoto.estimatedTransferTimeSecs / 60)} min
                </span>
              </div>
            </div>
          </div>

          {/* VISUAL PIPELINE STORY (PHOTO -> COMPRESS -> PACKET -> 2G LINK -> COMMAND CENTER) */}
          <div className="p-3 bg-slate-900 text-white rounded-xl shadow-xs space-y-2">
            <span className="text-[10.5px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
              Low-Bandwidth Pipeline Flow
            </span>

            <div className="flex items-center justify-between text-[11px] font-mono gap-1 text-center overflow-x-auto py-1">
              <div className="p-1.5 rounded bg-slate-800 border border-slate-700 shrink-0">
                <div className="text-[9px] text-slate-400">CAMERA</div>
                <div className="font-bold text-slate-200">
                  {(currentPhoto.originalSize / (1024 * 1024)).toFixed(1)} MB
                </div>
              </div>

              <ArrowRight className="w-3.5 h-3.5 text-blue-400 shrink-0" />

              <div className="p-1.5 rounded bg-blue-950 border border-blue-800 shrink-0">
                <div className="text-[9px] text-blue-300">WEBP/JPEG</div>
                <div className="font-bold text-blue-400">RE-ENCODE</div>
              </div>

              <ArrowRight className="w-3.5 h-3.5 text-blue-400 shrink-0" />

              <div className="p-1.5 rounded bg-emerald-950 border border-emerald-800 shrink-0">
                <div className="text-[9px] text-emerald-300">PACKET</div>
                <div className="font-bold text-emerald-400">
                  {(currentPhoto.compressedSize / 1024).toFixed(0)} KB
                </div>
              </div>

              <ArrowRight className="w-3.5 h-3.5 text-amber-400 shrink-0" />

              <div className="p-1.5 rounded bg-amber-950 border border-amber-800 shrink-0">
                <div className="text-[9px] text-amber-300">2G LINK</div>
                <div className="font-bold text-amber-400">12 KB/m</div>
              </div>

              <ArrowRight className="w-3.5 h-3.5 text-emerald-400 shrink-0" />

              <div className={`p-1.5 rounded border shrink-0 ${
                deliveryConfirmed 
                  ? 'bg-emerald-900 border-emerald-500 text-emerald-200' 
                  : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}>
                <div className="text-[9px]">HQ COMMAND</div>
                <div className="font-bold">{deliveryConfirmed ? '✓ DELIVERED' : 'QUEUED'}</div>
              </div>
            </div>

            {/* Transfer Progress Bar if transmitting */}
            {simulateTransfer && (
              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>Simulating 12 KB/min Transmission...</span>
                  <span>{transferProgress}%</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${transferProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* SIMULATE 2G TRANSMISSION BUTTON FOR DEMO / SIH PRESENTATION */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-[10.5px] text-slate-500 font-medium">
              {deliveryConfirmed 
                ? '✓ Synced with Command Center' 
                : 'Staged locally for low-bandwidth upload'}
            </span>

            <button
              type="button"
              onClick={runSimulatedTransfer}
              disabled={simulateTransfer || deliveryConfirmed}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                deliveryConfirmed
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : simulateTransfer
                  ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                  : 'bg-[#1a56db] hover:bg-blue-700 text-white shadow-xs'
              }`}
            >
              {deliveryConfirmed ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Delivered to HQ</span>
                </>
              ) : simulateTransfer ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Transmitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Test 2G Transfer (12 KB/m)</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
