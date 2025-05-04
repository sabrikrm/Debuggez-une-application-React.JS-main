import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";
import EventCard from "../../components/EventCard";

describe("EventCard dans Home", () => {
  it("rend une carte avec les données obligatoires", () => {
    render(
      <EventCard
        title="Exemple titre"
        imageSrc="/test.jpg"
        date={new Date("2024-04-01")}
        label="Conférence"
      />
    );

    expect(screen.getByText("Exemple titre")).toBeInTheDocument();
    expect(screen.getByText("Conférence")).toBeInTheDocument();
  });
});

jest.mock("../../contexts/DataContext", () => ({
  useData: () => ({

    events: [
      { title: "Test Event", cover: "/test.jpg", date: "2025-01-01" },
      { title: "Autre Event", cover: "/image.jpg", date: "2025-02-01" }
    ]
  }),
}));


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
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      
      ``
    });
  });

});


describe("When a page is created", () => {
  it("a list of events is displayed", () => {
    // to implement
  })
  it("a list a people is displayed", () => {
    // to implement
  })
  it("a footer is displayed", () => {
    // to implement
  })
  it("an event card, with the last event, is displayed", () => {
    // to implement
  })
});
