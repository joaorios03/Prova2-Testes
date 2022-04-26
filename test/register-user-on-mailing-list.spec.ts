import { RegisterUserOnMailingList } from '../src/register-user-on-mailing-list';
import { EmailNotificationService } from '../src/email-notification-service';
import { UserRepository } from '../src/user-repository';

/*João Pedro Rios Carvalho - Teste de Sistemas(Desenvolvimento de Sistemas)*/

describe('Register user on mailing list', () => {
    let userRepository: UserRepository
    let registerUserOnMailingList: RegisterUserOnMailingList
    let emailNotificationService: EmailNotificationService

    beforeEach(() => {
        userRepository = new UserRepository();
        emailNotificationService = new EmailNotificationService();
        registerUserOnMailingList = new RegisterUserOnMailingList(userRepository, emailNotificationService);
    })

    it('should throw error when the method findBy of the class UserRepository return an User(user is already registered)', function () {
        const spy = jest.spyOn(userRepository, 'findBy')
        spy.mockReturnValue({
            email: "email@email.com",
            name: "fulano de tal"
        })
        expect(() => registerUserOnMailingList.execute({
            email: "email@email.com",
            name: "fulano de tal"
        })).toThrow('User already registered');
    })

    it('should throw error when the method add of the class UserRepository return false(user not created on database)', function () {
        const spy = jest.spyOn(userRepository, 'add')
        spy.mockReturnValue(false)
        expect(() => registerUserOnMailingList.execute({
            email: "email@email.com",
            name: "fulano de tal"
        })).toThrow('User not created on database');
    })

    it('should throw error when the method send of the class EmailNotificationService return false(e-mail notification not sent)', function () {
        const spy = jest.spyOn(emailNotificationService, 'send')
        spy.mockReturnValue(false)
        expect(() => registerUserOnMailingList.execute({
            email: "email@email.com",
            name: "fulano de tal"
        })).toThrow('E-mail notification not sent');
    })
})