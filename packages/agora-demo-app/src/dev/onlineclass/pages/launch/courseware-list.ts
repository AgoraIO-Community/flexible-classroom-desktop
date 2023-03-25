export type CoursewarePageInfo = {
  /**
   * 预览图
   */
  /** @en
   *
   */
  preview?: string;
  /**
   * 图片资源链接
   */
  /** @en
   *
   */
  src: string;
  /**
   * 图片资源宽度
   */
  /** @en
   *
   */
  width: number;
  /**
   * 图片资源高度
   */
  /** @en
   *
   */
  height: number;
};
export type CoursewareItem = {
  /**
   * 课件名称
   */
  /** @en
   *
   */
  name: string;
  /**
   * 课件资源链接
   */
  /** @en
   *
   */
  url?: string;
  /**
   * 课件大小
   */
  /** @en
   *
   */
  size?: number;
  /**
   * 更新时间
   */
  /** @en
   *
   */
  updateTime?: number;
  /**
   * 课件转换ID
   */
  /** @en
   *
   */
  taskUuid?: string;
  /**
   * 课件资源列表
   */
  /** @en
   *
   */
  pages?: CoursewarePageInfo[];
};
/**
 * 公共课件列表
 */
/** @en
 *
 */
export type CoursewareList = CoursewareItem[];

export const coursewareList: CoursewareList = [
  {
    name: '1',
    size: 8478024,
    url: 'https://agora-adc-artifacts.oss-cn-beijing.aliyuncs.com/cloud-disk/f488493d1886435f963dfb3d95984fd4/test02090054/20c2281deddefa96a97fe16b3628b456.pptx',
    updateTime: 1646988472045,
    taskUuid: 'b81275a0a11711ecb94f39bd66b92986',
    pages: [
      {
        width: 1280,
        height: 720,
        preview:
          'https://convertcdn.netless.link/dynamicConvert/b81275a0a11711ecb94f39bd66b92986/preview/1.png',
        src: 'pptx://convertcdn.netless.link/dynamicConvert/b81275a0a11711ecb94f39bd66b92986/1.slide',
      },
      {
        width: 1280,
        height: 720,
        preview:
          'https://convertcdn.netless.link/dynamicConvert/b81275a0a11711ecb94f39bd66b92986/preview/2.png',
        src: 'pptx://convertcdn.netless.link/dynamicConvert/b81275a0a11711ecb94f39bd66b92986/2.slide',
      },
      {
        width: 1280,
        height: 720,
        preview:
          'https://convertcdn.netless.link/dynamicConvert/b81275a0a11711ecb94f39bd66b92986/preview/3.png',
        src: 'pptx://convertcdn.netless.link/dynamicConvert/b81275a0a11711ecb94f39bd66b92986/3.slide',
      },
      {
        width: 1280,
        height: 720,
        preview:
          'https://convertcdn.netless.link/dynamicConvert/b81275a0a11711ecb94f39bd66b92986/preview/4.png',
        src: 'pptx://convertcdn.netless.link/dynamicConvert/b81275a0a11711ecb94f39bd66b92986/4.slide',
      },
      {
        width: 1280,
        height: 720,
        preview:
          'https://convertcdn.netless.link/dynamicConvert/b81275a0a11711ecb94f39bd66b92986/preview/5.png',
        src: 'pptx://convertcdn.netless.link/dynamicConvert/b81275a0a11711ecb94f39bd66b92986/5.slide',
      },
      {
        width: 1280,
        height: 720,
        preview:
          'https://convertcdn.netless.link/dynamicConvert/b81275a0a11711ecb94f39bd66b92986/preview/6.png',
        src: 'pptx://convertcdn.netless.link/dynamicConvert/b81275a0a11711ecb94f39bd66b92986/6.slide',
      },
      {
        width: 1280,
        height: 720,
        preview:
          'https://convertcdn.netless.link/dynamicConvert/b81275a0a11711ecb94f39bd66b92986/preview/7.png',
        src: 'pptx://convertcdn.netless.link/dynamicConvert/b81275a0a11711ecb94f39bd66b92986/7.slide',
      },
      {
        width: 1280,
        height: 720,
        preview:
          'https://convertcdn.netless.link/dynamicConvert/b81275a0a11711ecb94f39bd66b92986/preview/8.png',
        src: 'pptx://convertcdn.netless.link/dynamicConvert/b81275a0a11711ecb94f39bd66b92986/8.slide',
      },
      {
        width: 1280,
        height: 720,
        preview:
          'https://convertcdn.netless.link/dynamicConvert/b81275a0a11711ecb94f39bd66b92986/preview/9.png',
        src: 'pptx://convertcdn.netless.link/dynamicConvert/b81275a0a11711ecb94f39bd66b92986/9.slide',
      },
      {
        width: 1280,
        height: 720,
        preview:
          'https://convertcdn.netless.link/dynamicConvert/b81275a0a11711ecb94f39bd66b92986/preview/10.png',
        src: 'pptx://convertcdn.netless.link/dynamicConvert/b81275a0a11711ecb94f39bd66b92986/10.slide',
      },
      {
        width: 1280,
        height: 720,
        preview:
          'https://convertcdn.netless.link/dynamicConvert/b81275a0a11711ecb94f39bd66b92986/preview/11.png',
        src: 'pptx://convertcdn.netless.link/dynamicConvert/b81275a0a11711ecb94f39bd66b92986/11.slide',
      },
      {
        width: 1280,
        height: 720,
        preview:
          'https://convertcdn.netless.link/dynamicConvert/b81275a0a11711ecb94f39bd66b92986/preview/12.png',
        src: 'pptx://convertcdn.netless.link/dynamicConvert/b81275a0a11711ecb94f39bd66b92986/12.slide',
      },
      {
        width: 1280,
        height: 720,
        preview:
          'https://convertcdn.netless.link/dynamicConvert/b81275a0a11711ecb94f39bd66b92986/preview/13.png',
        src: 'pptx://convertcdn.netless.link/dynamicConvert/b81275a0a11711ecb94f39bd66b92986/13.slide',
      },
      {
        width: 1280,
        height: 720,
        preview:
          'https://convertcdn.netless.link/dynamicConvert/b81275a0a11711ecb94f39bd66b92986/preview/14.png',
        src: 'pptx://convertcdn.netless.link/dynamicConvert/b81275a0a11711ecb94f39bd66b92986/14.slide',
      },
    ],
  },
  // {
  //   resourceName: 'H5 Demo 1',
  //   resourceUuid: `${Math.floor(Math.random() * 1000) + Date.now()}`,
  //   ext: 'ah5',
  //   url: 'https://courseware2.miaocode.com/v4-2/index.html?courseName=course-k1a-20',
  //   size: 0,
  //   updateTime: Date.now(),
  //   initOpen: false,
  // },
  // {
  //   resourceName: 'H5 Demo 2',
  //   resourceUuid: `${Math.floor(Math.random() * 1000) + Date.now()}`,
  //   ext: 'ah5',
  //   url: 'https://courseware2.miaocode.com/v4-2/index.html?courseName=course-disappear-dinosaur',
  //   size: 0,
  //   updateTime: Date.now(),
  //   initOpen: false,
  // },
  // {
  //   resourceName: 'youtube - RTE2022',
  //   resourceUuid: `${Math.floor(Math.random() * 1000) + Date.now()}`,
  //   ext: 'alf',
  //   url: 'http://youtube.com/watch?v=p3Bt6rAYIsQ',
  //   size: 0,
  //   updateTime: Date.now(),
  //   initOpen: false,
  // },
  // {
  //   resourceName: 'AgoraFlexibleClassroom',
  //   resourceUuid: `${Math.floor(Math.random() * 1000) + Date.now()}`,
  //   ext: 'alf',
  //   url: 'https://docs.google.com/presentation/d/1EbE3km3bIHOyzg49mcC92JRd5OQjw59c/edit?usp=sharing&ouid=109918631701376245075&rtpof=true&sd=true',
  //   size: 0,
  //   updateTime: Date.now(),
  //   initOpen: false,
  // },
  // {
  //   resourceName: 'scratch',
  //   resourceUuid: `${Math.floor(Math.random() * 1000) + Date.now()}`,
  //   ext: 'alf',
  //   url: 'https://istonecode.isoftstone.com/agora/',
  //   size: 0,
  //   updateTime: Date.now(),
  //   initOpen: false,
  // },
];
