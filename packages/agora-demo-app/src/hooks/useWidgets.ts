import { AgoraWidgetBase } from 'agora-common-libs/lib/widget';
import { useEffect, useState } from 'react';

const getWidgetName = (widgetClass: unknown) => {
  const Clz = widgetClass as typeof AgoraWidgetBase;
  return Object.create(Clz.prototype).widgetName;
};

export const useWidgets = (
  ids: (
    | 'FcrWebviewWidget'
    | 'FcrBoardWidget'
    | 'AgoraSelector'
    | 'AgoraCountdown'
    | 'AgoraHXChatWidget'
    | 'FcrStreamMediaPlayerWidget'
    | 'AgoraPolling'
    | 'FcrWatermarkWidget'
    | 'FcrBoardWidgetV2'
    | 'FcrPolling'
    | 'AgoraHXChatWidgetV2'
  )[],
) => {
  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState<Record<string, typeof AgoraWidgetBase>>({});
  useEffect(() => {
    const load = async () => {
      const widgets: Record<string, typeof AgoraWidgetBase> = {};
      if (ids.includes('FcrWebviewWidget')) {
        const { FcrWebviewWidget } = await import('agora-plugin-gallery/gallery/webview');
        widgets[getWidgetName(FcrWebviewWidget)] = FcrWebviewWidget;
      }
      if (ids.includes('FcrBoardWidget')) {
        const { FcrBoardWidget } = await import('agora-plugin-gallery/gallery/whiteboard');
        widgets[getWidgetName(FcrBoardWidget)] = FcrBoardWidget;
      }
      if (ids.includes('AgoraSelector')) {
        const { AgoraSelector } = await import('agora-plugin-gallery/gallery/answer');
        widgets[getWidgetName(AgoraSelector)] = AgoraSelector;
      }
      if (ids.includes('AgoraCountdown')) {
        const { AgoraCountdown } = await import('agora-plugin-gallery/gallery/counter');
        widgets[getWidgetName(AgoraCountdown)] = AgoraCountdown;
      }
      if (ids.includes('AgoraHXChatWidget')) {
        // const { AgoraHXChatWidget } = await import('agora-plugin-gallery/gallery/hx-chat');
        // widgets[getWidgetName(AgoraHXChatWidget)] = AgoraHXChatWidget;
      }
      if (ids.includes('FcrStreamMediaPlayerWidget')) {
        const { FcrStreamMediaPlayerWidget } = await import(
          'agora-plugin-gallery/gallery/stream-media'
        );
        widgets[getWidgetName(FcrStreamMediaPlayerWidget)] = FcrStreamMediaPlayerWidget;
      }
      if (ids.includes('AgoraPolling')) {
        const { AgoraPolling } = await import('agora-plugin-gallery/gallery/vote');
        widgets[getWidgetName(AgoraPolling)] = AgoraPolling;
      }
      if (ids.includes('FcrWatermarkWidget')) {
        const { FcrWatermarkWidget } = await import('agora-plugin-gallery/gallery/watermark');
        widgets[getWidgetName(FcrWatermarkWidget)] = FcrWatermarkWidget;
      }
      if (ids.includes('FcrBoardWidgetV2')) {
        const { FcrBoardWidget } = await import('agora-plugin-gallery/gallery/whiteboard-v2');
        widgets[getWidgetName(FcrBoardWidget)] = FcrBoardWidget;
      }

      if (ids.includes('FcrPolling')) {
        const { FcrPollingWidget } = await import('agora-plugin-gallery/gallery/polling');
        widgets[getWidgetName(FcrPollingWidget)] = FcrPollingWidget;
      }

      if (ids.includes('AgoraHXChatWidgetV2')) {
        const { AgoraHXChatWidget } = await import('agora-plugin-gallery/gallery/hx-chat/v2');
        widgets[getWidgetName(AgoraHXChatWidget)] = AgoraHXChatWidget;
      }

      setWidgets(widgets);
      setReady(true);
    };
    load();
  }, []);

  return { ready, widgets };
};
