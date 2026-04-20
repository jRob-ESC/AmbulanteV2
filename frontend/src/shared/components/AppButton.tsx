import { Button, useTheme } from "react-native-paper";

type Variant =
  | "primary"
  | "secondary"
  | "danger"
  | "disabled";

const variantColorMap = {
    primary: "primary",
    secondary: "secondary",
    danger: "error", // Maps our custom danger type to MD3 error type
    disabled: "surfaceDisabled", // Maps our custom disabled type to MD3 surfaceDisabled type 
} as const;

type Props = {
    variant?: Variant;
} & React.ComponentProps<typeof Button>;

export function AppButton({
    variant = "primary",
    style,
    disabled,
    ...props
}: Props) {
    const { colors } = useTheme();

    const themeKey = variantColorMap[variant];
    const buttonColor = colors[themeKey];

    const mode =
        variant === 'secondary' ? 'outlined' : 'contained';

    return (
        <Button
            {...props}
            mode={mode}
            buttonColor={variant !== 'secondary' ? buttonColor : undefined}
            textColor={variant === 'secondary' ? colors.primary : undefined}
            disabled={variant === 'disabled' || disabled}
            style={[
                {
                    borderRadius: 10,
                    alignSelf: "center",
                },
                style,
            ]}
            contentStyle={{
                paddingVertical: 2,
            }}
            labelStyle={{
                fontWeight: 700,
                fontSize: 16,
            }}
        />
    );
}