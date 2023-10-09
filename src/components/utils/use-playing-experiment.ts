import type { CallbackListener, PlayerRef } from "@remotion/player";
import { useCallback, useSyncExternalStore } from "react";
 
export const useCurrentPlayerPause = (ref: React.RefObject<PlayerRef>) => {
    
  const subscribe = useCallback(
    (onStoreChange: (newVal: any) => void) => {
      const { current } = ref;
      if (!current) {
        return () => undefined;
      }
      const updater: CallbackListener<"play"> = ({ detail }) => {
        console.log(detail, "detail in useCurrent Frame")
        onStoreChange(detail);
      };
      current.addEventListener("play", updater);
      return () => {
        current.removeEventListener("play", updater);
      };
    },
    [ref]
  );
 
  const data = useSyncExternalStore<any>(
    subscribe,
    () => ref.current?.isPlaying() ?? 0,
    () => 0
  );
 
  return data;
};