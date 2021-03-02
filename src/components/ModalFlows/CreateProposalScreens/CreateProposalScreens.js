import React, { useCallback, useMemo, useState } from 'react'
import ModalFlowBase from '../ModalFlowBase'
import ActionFees from './ActionFees'
import AddProposal from './AddProposal'
import CreateProposalRequirements from './CreateProposalRequirements'
// import useActions from '../../../hooks/useActions'
import { useAgreement } from '../../../hooks/useAgreement'
import useActions from '../../../hooks/useActions'
import { useStakingState } from '../../../providers/Staking'

function CreateProposalScreens() {
  const [agreement, agreementLoading] = useAgreement()
  const { stakeManagement, loading: stakingLoading } = useStakingState()
  const [proposalData, setProposalData] = useState()
  const [transactions, setTransactions] = useState([])
  const { convictionActions } = useActions()

  const getTransactions = useCallback(
    async onComplete => {
      const { amount, beneficiary, link, title } = proposalData

      let params
      if (amount.valueBN.eq(0)) {
        params = {
          title,
          link,
        }
      } else {
        const convertedAmount = amount.valueBN.toString(10)
        const stableRequestAmount = amount.stable

        params = {
          title,
          link,
          amount: convertedAmount,
          stableRequestAmount,
          beneficiary,
        }
      }

      await convictionActions[('newProposal', 'newSignalingProposal')](
        params,
        intent => {
          setTransactions(intent.transactions)
          onComplete()
        }
      )
    },
    [convictionActions, proposalData]
  )

  const screens = useMemo(
    () =>
      stakingLoading
        ? []
        : [
            {
              title: 'Submit action requirements',
              graphicHeader: false,
              content: (
                <CreateProposalRequirements
                  agreement={agreement}
                  staking={stakeManagement.staking}
                />
              ),
            },
            {
              title: 'Create post',
              graphicHeader: true,
              content: <AddProposal setProposalData={setProposalData} />,
            },
            {
              title: 'Action fees',
              graphicHeader: false,
              content: (
                <ActionFees
                  agreement={agreement}
                  onCreateTransaction={getTransactions}
                />
              ),
            },
          ],
    [agreement, getTransactions, stakingLoading, stakeManagement]
  )
  return (
    <ModalFlowBase
      frontLoad
      loading={agreementLoading || stakingLoading}
      transactions={transactions}
      transactionTitle="Create transaction"
      screens={screens}
    />
  )
}

export default CreateProposalScreens
