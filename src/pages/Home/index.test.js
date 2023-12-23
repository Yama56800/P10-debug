import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      
      // Find the submit button and click it
      const submitButton = await screen.findByText("Envoyer");
      fireEvent.click(submitButton);

      // Wait for the loading message to appear
      await screen.findByText(/En cours/);

      // Wait for the success message to appear
       screen.findByText("Message envoyé !");
    });
  });
});

describe("When a page is created", () => {
  it("a list of events is displayed", () => {
    // Implement your test for events
  });

  it("a list of people is displayed", () => {
    // Implement your test for people
  });

  it("a footer is displayed", () => {
    // Implement your test for the footer
  });

  it("an event card, with the last event, is displayed", () => {
    // Implement your test for the last event card
  });
});
