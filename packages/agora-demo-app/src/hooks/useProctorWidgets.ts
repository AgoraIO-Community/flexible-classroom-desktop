import { FcrUISceneWidget, AgoraCloudClassWidget } from 'agora-common-libs';
import { useEffect, useState } from 'react';
const getWidgetName = (widgetClass: unknown) => {
  const Clz = widgetClass as typeof FcrUISceneWidget | typeof AgoraCloudClassWidget;
  return Object.create(Clz.prototype).widgetName;
};

export const useProctorWidgets = (ids: 'FcrWebviewWidget'[]) => {
  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState<Record<string, typeof AgoraCloudClassWidget>>({});
  useEffect(() => {
    const load = async () => {
      const widget = await import(/* webpackPrefetch: true */ 'agora-plugin-gallery/proctor');
      const widgets: Record<string, typeof AgoraCloudClassWidget> = {};
      if (ids.includes('FcrWebviewWidget')) {
        const { FcrWebviewWidget } = widget;
        widgets[getWidgetName(FcrWebviewWidget)] = FcrWebviewWidget;
      }

      setWidgets(widgets);
      setReady(true);
    };
    load();
  }, []);

  return { ready, widgets };
};
