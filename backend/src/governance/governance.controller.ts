import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from '../auth/admin.guard';
import { GovernanceService } from './governance.service';
import { CreateProposalDto } from './dto/create-proposal.dto';
import { VoteProposalDto } from './dto/vote-proposal.dto';
import { DelegateVoteDto } from './dto/delegate-vote.dto';
import { RevokeVoteDelegationDto } from './dto/revoke-vote-delegation.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Controller('v1/governance')
export class GovernanceController {
  constructor(private readonly governanceService: GovernanceService) {}

  @Get('voters')
  @UseGuards(AdminGuard)
  async getVoters(@Query() query: PaginationQueryDto) {
    return this.governanceService.getVoters(query);
  }

  @Get('delegations/:address')
  async getDelegations(@Param('address') address: string) {
    return this.governanceService.getDelegations(address);
  }

  @Get('proposals')
  async getProposals(@Query() query: PaginationQueryDto) {
    return this.governanceService.getProposals(query);
  }

  @Get('proposals/:id')
  async getProposal(@Param('id') id: string) {
    return this.governanceService.getProposal(id);
  }

  @Post('create_proposal')
  async createProposal(@Body() dto: CreateProposalDto) {
    return this.governanceService.buildCreateProposal(dto);
  }

  @Post('vote_proposal')
  async voteProposal(@Body() dto: VoteProposalDto) {
    return this.governanceService.buildVoteProposal(dto);
  }

  @Post('delegate_vote')
  async delegateVote(@Body() dto: DelegateVoteDto) {
    return this.governanceService.buildDelegateVote(dto);
  }

  @Post('revoke_vote_delegation')
  async revokeVoteDelegation(@Body() dto: RevokeVoteDelegationDto) {
    return this.governanceService.buildRevokeVoteDelegation(dto);
  }
}
