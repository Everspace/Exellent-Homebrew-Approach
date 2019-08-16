import React from "react"
import { css } from "@emotion/core"
import { wrapContext } from "lib/GatsbyContext"
import { cardClass } from "style/common"

let attuneStyle = css`
  & > strong {
    color: green;
  }
`
let hearthstoneStyle = css`
  & > strong {
    color: blue;
  }
`

const Armor = ({ weight, soak, hardness, mobilityPenalty, ...props }) => (
  <div {...props}>
    <span key="type">
      <strong>Type: </strong> {weight} Armor
    </span>
    <span key="stats">
      (+
      {soak} Soak, Hardness {hardness}, Mobility Penalty {mobilityPenalty})
    </span>
  </div>
)

const Hearthstones = ({ hearthstoneslots, ...props }) =>
  hearthstoneslots ? (
    <div className={hearthstoneStyle} {...props}>
      <span>
        <strong>Hearthstone Slots:</strong> {hearthstoneslots}
      </span>
    </div>
  ) : null

const Weapon = props => <div {...props}>Weapon Not done yet!</div>
const Other = props => null

let mapping = {
  Armor,
  Weapon,
}

const Attunement = ({ node, category = "Armor", ...props }) => {
  let { equipmentTags, hearthstoneSlots, era } = node
  let attunementCost = node.attunement
  let Statline = mapping[category]
  let stats = {}
  switch (category) {
    case /[Aa]rmou?r/:
      let { weight } = node
      stats = {
        weight,
      }
      break
    default:
      Statline = Other
      break
  }

  return (
    <div {...props} className={`${cardClass} ${props.className}`}>
      <div className={attuneStyle} key="attunement">
        <span>
          <strong>Attunement: </strong> {attunementCost}
        </span>
      </div>
      <Statline key="statline" {...stats} />
      <Hearthstones hearthstoneslots={hearthstoneSlots} />
      <div key="tags">
        <span>
          <strong>Tags: </strong>
          {equipmentTags ? equipmentTags.join(", ") : "None"}
        </span>
      </div>
      <div key="era">
        <strong>Era: </strong>
        <span>{era || "Age of Sorrows"}</span>
      </div>
    </div>
  )
}

export const attunement = wrapContext(Attunement)
