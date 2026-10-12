'use client';

import { useRef } from 'react';
import { useViewportNotifier } from '@/lib/hooks';
import { useT } from '@/lib/i18n-client';
import { PRODUCTS } from '@/lib/data/products';
import VerticalTitle from '@/components/shared/VerticalTitle';
import DvLink from '@/components/shared/DvLink';

export default function Products({ onEnter }: { onEnter?: () => void }) {
  const t = useT();
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useViewportNotifier(ref, onEnter);

  return (
    <div className="dv-products" id="products" ref={ref}>
      <div className="content flex">
        <VerticalTitle title={t('home.ourProducts')} className="half" content={contentRef} />

        <div className="products half" ref={contentRef}>
          {PRODUCTS.map((product) => (
            <div className="item" key={product.id}>
              <div className="h6">{product.title}</div>
              <p>{product.excerpt}</p>

              <a href={product.url} target="_blank">
                <div className="green-f h4 pointer product-name">{product.name}</div>
              </a>
              <DvLink external={product.url} newTab={true} textKey={product.name + ' website'} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
