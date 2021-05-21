import React from 'react'
import ProposalDetail from './ProposalDetail/ProposalDetail'
import Loader from '../Loader'
import useProposalLogic from '../../logic/proposal-logic'
import { useProposalWithThreshold } from '@hooks/useProposals'
import { ProposalTypes } from '@/types'

function ProposalLoader({ match }) {
  const {
    actions: { agreementActions, convictionActions },
    loading,
    permissions,
    proposal,
    requestToken,
    stableToken,
    vaultBalance,
  } = useProposalLogic(match)

  if (!proposal || loading) {
    return <Loader />
  }

  return proposal.type === ProposalTypes.Proposal ? (
    <WithThreshold
      proposal={proposal}
      actions={{ ...agreementActions, ...convictionActions }}
      permissions={permissions}
      requestToken={requestToken}
      stableToken={stableToken}
      vaultBalance={vaultBalance}
    />
  ) : (
    <ProposalDetail
      proposal={proposal}
      actions={{ ...agreementActions, ...convictionActions }}
      permissions={permissions}
      requestToken={requestToken}
      stableToken={stableToken}
      vaultBalance={vaultBalance}
    />
  )
}

function WithThreshold({ proposal, ...props }) {
  const [proposalWithThreshold, loading] = useProposalWithThreshold(proposal)

  if (loading) {
    return <Loader />
  }

  return <ProposalDetail proposal={proposalWithThreshold} {...props} />
}

export default ProposalLoader
