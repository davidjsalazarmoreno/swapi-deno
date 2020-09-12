describe("/api/people", () => {
  it("should get all people", () => {
    cy.request("http://localhost:8000/api/people")
      .should((response) => {
        expect(response.status).to.eq(200);
      });
  });
});
