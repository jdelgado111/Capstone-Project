import { handleClick, updateUI } from "../src/client/js/onClick";

describe("Testing the submit functionality", () => { 
    test("Ensure handleSubmit() is defined", () => {
           expect(handleClick).toBeDefined();
})});

describe("Testing the update functionality", () => { 
    test("Ensure updateUI() is defined", () => {
           expect(updateUI).toBeDefined();
})});
