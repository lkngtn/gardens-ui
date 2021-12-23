import React from 'react'

import { useTheme } from '@1hive/1hive-ui'

import blockIcon from '@assets/blockIcon.svg'
import signRequestFailIllustration from '@assets/signRequestFail.svg'
import signRequestSuccessIllustration from '@assets/signRequestSuccess.svg'
import trxBeingMinedIllustration from '@assets/trxBeingMined.svg'

import { IndividualStepTypes } from '../stepper-statuses'

const illustrations = {
  [IndividualStepTypes.STEP_WORKING]: trxBeingMinedIllustration,
  [IndividualStepTypes.STEP_SUCCESS]: signRequestSuccessIllustration,
  [IndividualStepTypes.STEP_ERROR]: signRequestFailIllustration,
}

function Illustration({ status, index }) {
  const theme = useTheme()
  return (
    <>
      {status === IndividualStepTypes.STEP_PROMPTING ? (
        <div
          css={`
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            width: 100%;
            border-radius: 100%;
            background-color: ${theme.contentSecondary};
            color: ${theme.positiveContent};
          `}
        >
          <img src={blockIcon} height={48} width={48} />
        </div>
      ) : (
        <img src={illustrations[status]} height={96} width={96} />
      )}
    </>
  )
}

export default Illustration
