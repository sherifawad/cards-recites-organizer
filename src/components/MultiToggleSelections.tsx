import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type Props = {
	options: {
		label: string;
		value: string;
	}[];

	selectedValues: string[];
	onSelectionChange: (value: string[]) => void;
};

const MultiToggleSelections = ({
	options,
	onSelectionChange,
	selectedValues,
}: Props) => {
	return (
		<ToggleGroup
			variant='outline'
			type='multiple'
			value={selectedValues}
			onValueChange={onSelectionChange}
		>
			{options.map(o => (
				<ToggleGroupItem key={o.value} value={o.value} aria-label='Toggle bold'>
					{o.label}
				</ToggleGroupItem>
			))}
		</ToggleGroup>
	);
};

export default MultiToggleSelections;
