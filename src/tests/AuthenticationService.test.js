import AuthenticationService from '../ui/AuthenticationService.js';


it("should resolve with true when executeBasicAuthenticationService is called", ()=>{
    expect(AuthenticationService.executeBasicAuthenticationService("user", "pass")).toEqual(true);
});

it("should return true when the session storage has the authenticated user value", ()=>{
    spyOn(global.sessionStorage, "getItem").and.returnValue("user");
    expect(AuthenticationService.isUserLoggedIn).toBeTruthy();
});
