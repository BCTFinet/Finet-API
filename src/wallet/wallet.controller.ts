import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { WalletDocument } from '../schema/wallet.schema';
import { Types } from 'mongoose';

import { ApiBearerAuth, ApiOkResponse, ApiTags, ApiOperation, ApiCreatedResponse, ApiNotFoundResponse, ApiBadRequestResponse } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Wallets')
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @ApiOperation({ summary: 'Get all wallets' })
  @ApiOkResponse({ 
      description: 'Successfully fetched all wallets.',
      isArray: true
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Req() req) : Promise<{ message: string, wallets : WalletDocument[] | null}> {
    const wallets = await this.walletService.findAll(req.user.userId);
    
    return {
      message: "Succesfully Retrieved Wallets",
      wallets
    }
  }
  
  @ApiOperation({ summary: 'Get a wallet by ID' })
  @ApiOkResponse({ description: 'Successfully fetched the wallet.'})
  @ApiNotFoundResponse({ description: 'Wallet not found' })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: Types.ObjectId, @Req() req)  : Promise<{ message: string, wallet : WalletDocument}> {
    const wallet = await this.walletService.findOne(id, req.user.userId);
    
    return {
      message: "Succesfully Retrieved Wallet",
      wallet
    }
  }
  
  @ApiOperation({ summary: 'Create a new wallet' })
  @ApiCreatedResponse({ 
      description: 'Successfully created a wallet.',
      type: CreateWalletDto
  })
  @ApiBadRequestResponse({ description: 'Invalid wallet data' })
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createWalletDto: CreateWalletDto, @Req() req) : Promise<{ message: string, wallet : WalletDocument}> {
    const wallet = await this.walletService.create(createWalletDto, req.user.userId);

    return {
      message : "Succesfully Created Wallet",
      wallet
    }
  }

  @ApiOperation({ summary: 'Update a wallet' })
  @ApiCreatedResponse({ 
      description: 'Successfully updated a wallet.',
      type: UpdateWalletDto
  })
  @ApiNotFoundResponse({ description: 'Wallet not found' })
  @ApiBadRequestResponse({ description: 'Invalid wallet data' })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: Types.ObjectId, @Body() updateWalletDto: UpdateWalletDto, @Req() req) : Promise<{ message: string, wallet : WalletDocument}> {
    const wallet = await this.walletService.update(id, updateWalletDto, req.user.userId);

    return {
      message : "Succesfully Updated Wallet",
      wallet
    }
  }
  
  @ApiOperation({ summary: 'Delete a wallet' })
  @ApiCreatedResponse({ 
      description: 'Successfully deleted a wallet.',
      type: UpdateWalletDto
  })
  @ApiNotFoundResponse({ description: 'Wallet not found' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: Types.ObjectId, @Req() req) {
    await this.walletService.remove(id, req.user.userId);

    return {
      message : "Succesfully Deleted Wallet"
    }
  }
}
