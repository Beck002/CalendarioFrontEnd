import { calendarApi } from '../../src/api'


describe('Pruebas en el calendarApi', ()=>{
    

    test('debe tener la configuracion por defecto', () => { 
        
        expect( calendarApi.defaults.baseURL ).toBe(process.env.VITE_API_URL);

    });

    test('debe tener el x-token en el header de todas las peticiones', async () => {  

        const token = '123456';
        localStorage.setItem('token', token);

        const res  = await calendarApi.get('/auth');

        expect(res.config.headers['x-token']).toBe(token)

    });

})










