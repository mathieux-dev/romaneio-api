import {
  DomainException,
  NotFoundException,
  ConflictException,
  ValidationException,
} from './index';

describe('Domain Exceptions', () => {
  describe('DomainException', () => {
    it('should create a domain exception with message', () => {
      const message = 'Domain error occurred';
      const exception = new DomainException(message);

      expect(exception).toBeInstanceOf(Error);
      expect(exception).toBeInstanceOf(DomainException);
      expect(exception.message).toBe(message);
      expect(exception.name).toBe('DomainException');
    });

    it('should have a stack trace', () => {
      const exception = new DomainException('Test error');

      expect(exception.stack).toBeDefined();
    });
  });

  describe('NotFoundException', () => {
    it('should create a not found exception', () => {
      const message = 'Resource not found';
      const exception = new NotFoundException(message);

      expect(exception).toBeInstanceOf(Error);
      expect(exception).toBeInstanceOf(DomainException);
      expect(exception).toBeInstanceOf(NotFoundException);
      expect(exception.message).toBe(message);
      expect(exception.name).toBe('NotFoundException');
    });
  });

  describe('ConflictException', () => {
    it('should create a conflict exception', () => {
      const message = 'Resource already exists';
      const exception = new ConflictException(message);

      expect(exception).toBeInstanceOf(Error);
      expect(exception).toBeInstanceOf(DomainException);
      expect(exception).toBeInstanceOf(ConflictException);
      expect(exception.message).toBe(message);
      expect(exception.name).toBe('ConflictException');
    });
  });

  describe('ValidationException', () => {
    it('should create a validation exception', () => {
      const message = 'Validation failed';
      const exception = new ValidationException(message);

      expect(exception).toBeInstanceOf(Error);
      expect(exception).toBeInstanceOf(DomainException);
      expect(exception).toBeInstanceOf(ValidationException);
      expect(exception.message).toBe(message);
      expect(exception.name).toBe('ValidationException');
    });
  });
});
