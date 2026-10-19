/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { BD_PHONE_REGEX } from 'src/common/utils/phone.utils';
import { IsImageUrl } from '../../common/validators/is-image-url.decorator';
import { IsOptional, IsString, Matches, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateCompanyDto {
  // Basic
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @IsImageUrl({ optional: true })
  logo?: string;

  @IsImageUrl({ optional: true })
  favicon?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  tagline?: string;

  @IsOptional()
  @IsString()
  about?: string;

  @IsOptional()
  @IsString()
  privacyPolicy?: string;

  // Contact
  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => {
    if (typeof value !== 'string') return value;

    // Remove all spaces, dashes, or parentheses
    const cleaned = value.replace(/[\s\-\(\)]/g, '');

    // If it starts with '01' and has 11 digits (e.g. 01712345678)
    if (/^01[3-9]\d{8}$/.test(cleaned)) {
      return `+88${cleaned}`;
    }

    // If it starts with '8801' without the plus sign (e.g. 8801712345678)
    if (/^8801[3-9]\d{8}$/.test(cleaned)) {
      return `+${cleaned}`;
    }

    // Return cleaned value as-is to let the @Matches validator catch it if invalid
    return cleaned;
  })
  @Matches(BD_PHONE_REGEX, {
    message:
      'WhatsApp must be a valid Bangladeshi phone number in +8801XXXXXXXXX format',
  })
  whatsapp?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  googleMapUrl?: string;

  // Social
  @IsOptional()
  @IsString()
  facebook?: string;

  @IsOptional()
  @IsString()
  instagram?: string;

  @IsOptional()
  @IsString()
  youtube?: string;

  @IsOptional()
  @IsString()
  tiktok?: string;

  @IsOptional()
  @IsString()
  twitter?: string;

  @IsOptional()
  @IsString()
  linkedin?: string;

  // SEO
  @IsOptional()
  @IsString()
  @MaxLength(60)
  metaTitle?: string;

  @IsOptional()
  @IsString()
  @MaxLength(160)
  metaDescription?: string;

  @IsImageUrl({ optional: true })
  ogImage?: string;

  // Marketing / tracking
  @IsOptional()
  @IsString()
  metaPixelId?: string;
}
