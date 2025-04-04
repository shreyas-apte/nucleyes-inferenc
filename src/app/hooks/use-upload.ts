import { useState } from "react";
import axios from "axios";

const useUpload = () => {
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortController = new AbortController();

  const uploadFile = async (presignedUrl: string, file: Blob | File) => {
    try {
      setIsUploading(true);

      await axios.put(presignedUrl, file, {
        onUploadProgress: (progressEvent) => {
          if (!progressEvent.total) {
            return NaN;
          }

          const percentage = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentage);
        },
        headers: {
          "Content-Type": file.type,
        },
        // signal: abortController.signal,
      });

      // Upload completed successfully
      setProgress(100);
      setIsUploading(false);
      setError(null);
    } catch (error) {
      if (!axios.isCancel(error)) {
        // Upload error (excluding cancellation)
        setIsUploading(false);
        setError("Upload failed.");
      }
    }
  };

  const abortUpload = () => {
    abortController.abort();
    setIsUploading(false);
    setProgress(0);
    setError("Upload aborted.");
  };

  const reset = () => {
    abortController.abort();
    setIsUploading(false);
    setProgress(0);
  };

  return { progress, isUploading, error, uploadFile, abortUpload, reset };
};

export default useUpload;
