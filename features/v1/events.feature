Feature: events

  Scenario: should get events
    Given there are events:
      | title | image_url |
      | event 1 | http://image.com/event-1.png |
      | event 2 | http://image.com/event-2.png |
      | event 3 | http://image.com/event-3.png |
    When I send "GET" request to "/api/v1/events"
    Then the response code should be 200
    And the response should match json:
      """
      {
      }
      """
