import {
  CreateRestaurantDTO,
  RestaurantResponseDTO,
  UpdateRestaurantDTO,
} from '../dto';

export const MONGO_OBJECT_ID = '507f1f77bcf86cd799439011';

export const mockCreateRestaurantDTO: CreateRestaurantDTO = {
  ownerId: '685018c0ccc63266b76b0321',
  name: 'Test Restaurant',
  description: 'Cozy place with beautiful sunset views.',
  address: '789 Ocean Drive, Miami, FL',
  phone: '+13051234567',
  email: 'contact@sunsetgrill.com',
  openingTime: 1100,
  closingTime: 2230,
  breakTime: [1500, 1600],
  location: 'Miami Beach',
};

export const mockRestaurantResponseDTO: RestaurantResponseDTO = {
  id: expect.any(String),
  status: 'ACTIVE',
  ownerId: '685018c0ccc63266b76b0321',
  name: 'Test Restaurant',
  description: 'Cozy place with beautiful sunset views.',
  address: '789 Ocean Drive, Miami, FL',
  phone: '+13051234567',
  email: 'contact@sunsetgrill.com',
  openingTime: 1100,
  closingTime: 2230,
  breakTime: [1500, 1600],
  likes: 0,
  views: 0,
  location: 'Miami Beach',
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
};

export const mockUpdateRestaurantDTO: UpdateRestaurantDTO = {
  status: 'ACTIVE',
  name: 'Test Restaurant',
  description: 'Cozy place with beautiful sunset views.',
  address: '789 Ocean Drive, Miami, FL',
  phone: '+13051234567',
  email: 'contact@sunsetgrill.com',
  openingTime: 1100,
  closingTime: 2230,
  breakTime: [1500, 1600],
  location: 'Miami Beach',
};

export const mockUpdateRestaurantResponseDTO: RestaurantResponseDTO = {
  id: MONGO_OBJECT_ID,
  status: 'ACTIVE',
  ownerId: '685018c0ccc63266b76b0321',
  name: 'Test Restaurant',
  description: 'Cozy place with beautiful sunset views.',
  address: '789 Ocean Drive, Miami, FL',
  phone: '+13051234567',
  email: 'contact@sunsetgrill.com',
  openingTime: 1100,
  closingTime: 2230,
  breakTime: [1500, 1600],
  likes: 0,
  views: 0,
  location: 'Miami Beach',
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
};

export const NON_EXISTENT_ID = 'non-existent-id';
