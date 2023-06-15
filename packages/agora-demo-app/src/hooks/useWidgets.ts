import { SdkType } from '@app/type';
import { AgoraWidgetBase } from 'agora-common-libs';
import { useEffect, useState } from 'react';
const getWidgetName = (widgetClass: unknown) => {
  const Clz = widgetClass as typeof AgoraWidgetBase;
  return Object.create(Clz.prototype).widgetName;
};

export const useClassroomWidgets = (
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
      const widget = await import(/* webpackPrefetch: true */ `agora-plugin-gallery/classroom`);
      const widgets: Record<string, typeof AgoraWidgetBase> = {};
      if (ids.includes('FcrWebviewWidget')) {
        const { FcrWebviewWidget } = widget;
        widgets[getWidgetName(FcrWebviewWidget)] = FcrWebviewWidget;
      }
      if (ids.includes('FcrBoardWidget')) {
        const { FcrBoardWidget } = widget;
        widgets[getWidgetName(FcrBoardWidget)] = FcrBoardWidget;
      }
      if (ids.includes('AgoraSelector')) {
        const { AgoraSelector } = widget;
        widgets[getWidgetName(AgoraSelector)] = AgoraSelector;
      }
      if (ids.includes('AgoraCountdown')) {
        const { AgoraCountdown } = widget;
        widgets[getWidgetName(AgoraCountdown)] = AgoraCountdown;
      }
      if (ids.includes('AgoraHXChatWidget')) {
        const { AgoraHXChatWidget } = widget;
        widgets[getWidgetName(AgoraHXChatWidget)] = AgoraHXChatWidget;
      }
      if (ids.includes('FcrStreamMediaPlayerWidget')) {
        const { FcrStreamMediaPlayerWidget } = widget;
        widgets[getWidgetName(FcrStreamMediaPlayerWidget)] = FcrStreamMediaPlayerWidget;
      }
      if (ids.includes('AgoraPolling')) {
        const { AgoraPolling } = widget;
        widgets[getWidgetName(AgoraPolling)] = AgoraPolling;
      }
      if (ids.includes('FcrWatermarkWidget')) {
        const { FcrWatermarkWidget } = widget;
        widgets[getWidgetName(FcrWatermarkWidget)] = FcrWatermarkWidget;
      }
      if (ids.includes('FcrBoardWidgetV2')) {
        const { FcrBoardWidgetV2 } = widget;
        widgets[getWidgetName(FcrBoardWidgetV2)] = FcrBoardWidgetV2;
      }

      if (ids.includes('FcrPolling')) {
        const { FcrPollingWidget } = widget;
        widgets[getWidgetName(FcrPollingWidget)] = FcrPollingWidget;
      }

      if (ids.includes('AgoraHXChatWidgetV2')) {
        const { FcrChatroom } = widget;
        widgets[getWidgetName(FcrChatroom)] = FcrChatroom;
      }

      setWidgets(widgets);
      setReady(true);
    };
    load();
  }, []);

  return { ready, widgets };
};
export const useProctorWidgets = (
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
      const widget = await import(/* webpackPrefetch: true */ `agora-plugin-gallery/proctor`);
      const widgets: Record<string, typeof AgoraWidgetBase> = {};
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
export const useOnlineclassWidgets = (
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
      const widget = await import(/* webpackPrefetch: true */ `agora-plugin-gallery/onlineclass`);
      const widgets: Record<string, typeof AgoraWidgetBase> = {};

      if (ids.includes('FcrBoardWidgetV2')) {
        const { FcrBoardWidgetV2 } = widget;
        widgets[getWidgetName(FcrBoardWidgetV2)] = FcrBoardWidgetV2;
      }

      if (ids.includes('FcrPolling')) {
        const { FcrPollingWidget } = widget;
        widgets[getWidgetName(FcrPollingWidget)] = FcrPollingWidget;
      }

      if (ids.includes('AgoraHXChatWidgetV2')) {
        const { FcrChatroom } = widget;
        widgets[getWidgetName(FcrChatroom)] = FcrChatroom;
      }

      setWidgets(widgets);
      setReady(true);
    };
    load();
  }, []);

  return { ready, widgets };
};
