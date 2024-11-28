const {UserController} = require('../../controllers/index');
const {UserModel} = require('../../database/models/index');
const {GenerateJWT, GenerateSalt, HashPassword} = require('../../utils/index');


// mocks
jest.mock('../../database/models/index');
jest.mock('../../utils/index');

const mockRes=()=>{
    const res={};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
}

// clear mocks before each test
beforeEach(()=>{ 
    jest.clearAllMocks();
});

const regMockReq ={
    body:{
        name: 'fake_name',
        email: 'fake_email',
        password: 'fake_pass'
    }
}

describe('Register User', ()=>{
    
    // ------ success
    test('register user with status 201', async()=>{
        UserModel.findOne.mockResolvedValue(null);

        GenerateSalt.mockResolvedValue('fakeSalt');
        HashPassword.mockResolvedValue('hashedFakePass');

        UserModel.create.mockResolvedValue({
            _id: '_id',
            name: 'fake_name',
            email: 'fake_email',
            password: 'hashedFakePass',
            salt: 'fakeSalt'
        });

        GenerateJWT.mockResolvedValue('fakeToken');

        const res = mockRes();
        await UserController.registerUser(regMockReq,res);

        // assertions
        expect(UserModel.findOne).toHaveBeenCalledWith({email: regMockReq.body.email});
        expect(GenerateSalt).toHaveBeenCalled();
        expect(HashPassword).toHaveBeenCalledWith(regMockReq.body.password, 'fakeSalt');
        expect(UserModel.create).toHaveBeenCalledWith({
            name: regMockReq.body.name,
            email: regMockReq.body.email,
            password: 'hashedFakePass',
            salt: 'fakeSalt'
        });
        expect(GenerateJWT).toHaveBeenCalledWith({_id: '_id'});
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            message: 'User registered successfully',
            user: {
                _id: '_id',
                name: 'fake_name',
                email: 'fake_email',
                password: 'hashedFakePass',
                salt: 'fakeSalt'
            },
            token: 'fakeToken',
        });
    });

    // ---- email exists
    test('user with email exist status 400', async()=>{
        UserModel.findOne.mockResolvedValue({email: 'fake_email'});
        const res = mockRes();
        await UserController.registerUser(regMockReq,res);
        // assertions
        expect(UserModel.findOne).toHaveBeenCalledWith({email: regMockReq.body.email});
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'User already exists with this email.'});
    });

})