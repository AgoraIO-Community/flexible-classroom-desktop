import type { CoursewareList } from 'fcr-ui-scene';

export const coursewareList: CoursewareList = [
  {
    resourceUuid: '20c2281deddefa96a97fe16b3628b456',
    resourceName: 'Agora Flexible Classroom v2.1 Demo Instructions.pptx',
    ext: 'pptx',
    size: 8478024,
    url: 'https://agora-adc-artifacts.oss-cn-beijing.aliyuncs.com/cloud-disk/f488493d1886435f963dfb3d95984fd4/test02090054/20c2281deddefa96a97fe16b3628b456.pptx',
    updateTime: 1646988472045,
    taskUuid: 'b81275a0a11711ecb94f39bd66b92986',
    conversion: {
      type: 'dynamic',
      preview: true,
      scale: 1.2,
      outputFormat: 'png',
      canvasVersion: true,
    },
  },

  {
    resourceName: 'youtube - RTE2022',
    resourceUuid: `${Math.floor(Math.random() * 1000) + Date.now()}`,
    ext: 'alf',
    url: 'http://youtube.com/watch?v=p3Bt6rAYIsQ',
    size: 0,
    updateTime: Date.now(),
    initOpen: false,
  },
  {
    resourceName: 'AgoraFlexibleClassroom',
    resourceUuid: `${Math.floor(Math.random() * 1000) + Date.now()}`,
    ext: 'alf',
    url: 'https://docs.google.com/presentation/d/e/2PACX-1vQnzK1Fai2oRRjrOQBjC6zheJEaEtjr0QtXYSsmaf8a5R_RZxCM13xT_T1Wjw_s1A/embed?start=false&loop=false&delayms=3000',
    size: 0,
    updateTime: Date.now(),
    initOpen: false,
  },
];
