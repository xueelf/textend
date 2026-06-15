interface IconProps {
  svg: string;
  size?: number;
}

export function Icon({ svg, size = 16 }: IconProps) {
  return (
    <i
      class="icon"
      style={{ width: size, height: size }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
