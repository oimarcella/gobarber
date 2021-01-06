import React from 'react';
import { ContainerTooltip } from './styles';

interface TooltipProps {
  title: string;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  title,
  children = '',
  className,
}) => {
  return (
    <ContainerTooltip className={className}>
      {children}
      <span>{title}</span>
    </ContainerTooltip>
  );
};
export default Tooltip;
