import { graphql } from "react-relay";

import r from "../resolve";

export default r(graphql`
  fragment colorSchemeFragment on ColorScheme {
    id
    colorBy
    colorPool
    multicolorKeypoints
    opacity
    showSkeletons
    labelTags {
      fieldColor
      valueColors {
        color
        value
      }
    }
    defaultMaskTargetsColors {
      intTarget
      color
    }
    fields {
      colorByAttribute
      fieldColor
      path
      valueColors {
        color
        value
      }
      maskTargetsColors {
        intTarget
        color
      }
    }
  }
`);
