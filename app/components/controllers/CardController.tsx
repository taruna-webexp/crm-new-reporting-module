"use client";
import React from "react";
import type { CardControllerProps } from "../../types/components";
import Heading from "../typography/Heading";

const CardController: React.FC<CardControllerProps> = ({
  title,
  subtitle,
  children,
  footer,
  className,
}) => {
  return (
    <div className={`${className ?? ""} w-full`}>
      <div className="bg-white border border-neutral-200 rounded-lg shadow-sm p-6">
        {(title || subtitle) && (
          <div className="mb-4">
            {title && (
              <Heading
                level="h3"
                className="mb-4 text-body-sm text-neutral-800 mt-1 "
                headingText={title}
              />
            )}
            {subtitle && <p className="text-body-sm text-neutral-600 mt-1">{subtitle}</p>}
          </div>
        )}

        <div className="space-y-4">{children}</div>

        {footer && <div className="mt-6 border-t pt-4">{footer}</div>}
      </div>
    </div>
  );
};

export default CardController;
