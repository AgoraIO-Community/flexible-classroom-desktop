import { Carousel, CarouselProps } from 'antd';
import React, { ReactElement } from 'react';

type ACarouselProps = CarouselProps;

export function ACarousel(props: ACarouselProps): ReactElement {
  return <Carousel {...props} />;
}
