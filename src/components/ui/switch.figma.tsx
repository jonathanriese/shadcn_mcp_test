import figma from "@figma/code-connect"
import { Switch } from "./switch"

figma.connect(
  Switch,
  "https://www.figma.com/design/ejRYKClcVaPpz3q4h2XNZa/Obra-shadcn-ui-kit-community-edition--1.6.0---Community-?node-id=16-1801",
  {
    props: {
      checked: figma.enum("Checked?", {
        True: true,
        False: false,
      }),
      disabled: figma.enum("State", {
        Default: false,
        Focus: false,
        Disabled: true,
      }),
    },
    example: ({ checked, disabled }) => (
      <Switch checked={checked} disabled={disabled} />
    ),
  }
)
