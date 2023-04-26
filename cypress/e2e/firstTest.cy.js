//describe() or context() can be used, for the beginning of the code

/*
******************************************
* Basic test structure:
******************************************
*/
describe("Our first suite", () => {
// tests go in here:

  it("first test", () => {
  // test code goes in here
  })

  it("second test", () => {
  // test code goes in here
  })

  it("third test", () => {
  // test code goes in here
  })
})


/*
******************************************
* Nesting multiple section is possible:
******************************************
*/
describe("Our second suite", () => {
// tests go in here:

  describe("Our first suite section", () => {
  // tests go in here:

    it("first test", () => {
    // test code goes in here
    })

    it("second test", () => {
    // test code goes in here
    })

    it("third test", () => {
    // test code goes in here
    })
  })

  describe("Our second suite section", () => {
  // tests go in here:

    it("first test", () => {
    // test code goes in here
    })

    it("second test", () => {
    // test code goes in here
    })

    it("third test", () => {
    // test code goes in here
    })
  })
})


/*
******************************************
* Repetitive code (Tests which have to always run before some other tests)
* can be put inside a beforeEach():
******************************************
*/
describe("Our third suite", () => {
// tests go in here:

  describe("Our first suite section", () => {

    beforeEach("code for every test", () => {
      // repetitive test code goes here
      // this will be run before every test of the same suite section
    })

    // tests go in here:

    it("first test", () => {
      // test code goes in here
    })

    it("second test", () => {
      // test code goes in here
    })

    it("third test", () => {
      // test code goes in here
    })
  })

  describe("Our second suite section", () => {
    // tests go in here:

    it("first test", () => {
      // test code goes in here
    })

    it("second test", () => {
      // test code goes in here
    })

    it("third test", () => {
      // test code goes in here
    })
  })
})
