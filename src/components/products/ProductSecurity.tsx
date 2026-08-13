import React from 'react';
import { MascotBe } from '@/components/MascotBe';

interface SecurityItem {
  type: 'danger' | 'safe';
  label: string;
  detail?: string;
}

interface ProductSecurityProps {
  title: string;
  items: SecurityItem[];
  note?: string;
}

export const ProductSecurity: React.FC<ProductSecurityProps> = ({
  title,
  items,
  note,
}) => {
  return (
    <section className="py-10 md:py-14 bg-gray-50 border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm flex flex-col md:flex-row items-start gap-6">
          <div className="flex-shrink-0 flex justify-center w-full md:w-auto">
            <MascotBe pose="shield" className="w-28 h-28 md:w-36 md:h-36" aria-hidden="true" />
          </div>
          <div className="space-y-4 w-full">
            <h2 className="font-display font-extrabold text-xl text-primary-navy">
              {title}
            </h2>

            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={index} className="flex items-start space-x-3 text-sm text-gray-700">
                  <span
                    className={`flex-shrink-0 font-bold text-base leading-none mt-0.5 ${
                      item.type === 'danger' ? 'text-red-500' : 'text-emerald-600'
                    }`}
                  >
                    {item.type === 'danger' ? '✕' : '✓'}
                  </span>
                  <div>
                    <strong>{item.label}</strong>
                    {item.detail && (
                      <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{item.detail}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {note && (
              <p className="text-xs text-gray-500 font-sans italic pt-2 border-t border-gray-100 leading-relaxed">
                {note}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
