import * as SliderPrimitive from '@radix-ui/react-slider'

export interface SliderProps {
  min: number
  max: number
  value: number
  handleChange: (val: number[]) => void
}

const Slider: React.FC<SliderProps> = (props) => {
  const { min = 0, max = 0, value = 0, handleChange, ...rest } = props;

  return (
    <div className="w-full rounded-full">
      <SliderPrimitive.Root
        min={min}
        max={max}
        step={0.01}
        value={[value]}
        className="relative flex flex-row items-center flex-grow h-4 rounded-full"
        onValueChange={(value: any) => handleChange(value)}
      >
        {/* primary byself is background, foreground added is the for text */}
        <SliderPrimitive.Track className="bg-primary bg-opacity-10 relative flex-grow rounded-full h-1">
          <SliderPrimitive.Range className="bg-primary-foreground absolute h-full rounded-full" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="w-4 h-4 shadow-lg bg-primary-foreground rounded-full" />
      </SliderPrimitive.Root>
    </div>
  )
}

export default Slider;
