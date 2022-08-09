Feature: Example Decoder

  Scenario: Receive and decode a temperature measure
    When I successfully execute the action "device-manager/payload":"example" with args:
      | body.temperature | 27       |
      | body.reference   | "foobar" |
    Then The document "platform":"devices":"Example-foobar" content match:
      | model                          | "Example" |
      | reference                      | "foobar"  |
      | measures[0].values.temperature | 27        |
