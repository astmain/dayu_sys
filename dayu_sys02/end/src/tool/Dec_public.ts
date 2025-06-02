import {SetMetadata} from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
const Dec_public = () => SetMetadata(IS_PUBLIC_KEY, true);

 
export default Dec_public