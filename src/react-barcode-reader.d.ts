declare module 'react-barcode-reader' {
    export interface BarcodeReaderProps {
      // Define properties and their types
      cameraIndex?: number;
      format?: string;
      width?: number;
      height?: number;
      onDecode?: (results: any[]) => void;
      // ... other properties
    }
  
    export function useBarcodeReader(): BarcodeReaderProps;
  }