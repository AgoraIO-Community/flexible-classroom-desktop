import { FcrUISceneWidget, AgoraCloudClassWidget } from 'agora-common-libs';
import { useEffect, useState } from 'react';
const getWidgetName = (widgetClass: unknown) => {
  const Clz = widgetClass as typeof FcrUISceneWidget | typeof AgoraCloudClassWidget;
  return Object.create(Clz.prototype).widgetName;
};

export const useSceneWidgets = (
  ids: (
    | 'FcrWebviewWidget'
    | 'FcrBoardWidget'
    | 'FcrStreamMediaPlayerWidget'
    | 'FcrPolling'
    | 'AgoraChatroomWidget'
    | 'FcrCountdownWidget'
    | 'FcrPopupQuizWidget'
  )[],
) => {
  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState<Record<string, typeof FcrUISceneWidget>>({});
  useEffect(() => {
    const load = async () => {
      const widget = await import(/* webpackPrefetch: true */ 'agora-plugin-gallery/scene');
      const widgets: Record<string, typeof FcrUISceneWidget> = {};
      if (ids.includes('FcrPopupQuizWidget')) {
        const { FcrPopupQuizWidget } = widget;
        widgets[getWidgetName(FcrPopupQuizWidget)] = FcrPopupQuizWidget;
      }
      if (ids.includes('FcrCountdownWidget')) {
        const { FcrCountdownWidget } = widget;
        widgets[getWidgetName(FcrCountdownWidget)] = FcrCountdownWidget;
      }

      if (ids.includes('FcrBoardWidget')) {
        const { FcrBoardWidget } = widget;
        widgets[getWidgetName(FcrBoardWidget)] = FcrBoardWidget;
      }

      if (ids.includes('FcrPolling')) {
        const { FcrPollingWidget } = widget;
        widgets[getWidgetName(FcrPollingWidget)] = FcrPollingWidget;
      }

      if (ids.includes('AgoraChatroomWidget')) {
        const { FcrChatroom } = widget;
        widgets[getWidgetName(FcrChatroom)] = FcrChatroom;
      }

      if (ids.includes('FcrWebviewWidget')) {
        const { FcrWebviewWidget } = widget;
        widgets[getWidgetName(FcrWebviewWidget)] = FcrWebviewWidget;
      }
      if (ids.includes('FcrStreamMediaPlayerWidget')) {
        const { FcrStreamMediaPlayerWidget } = widget;
        widgets[getWidgetName(FcrStreamMediaPlayerWidget)] = FcrStreamMediaPlayerWidget;
      }
      setWidgets(widgets);
      setReady(true);
    };
    load();
  }, []);

  return { ready, widgets };
};
