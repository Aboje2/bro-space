import { BroItemsModel } from "./BroItems"

test("can be created", () => {
  const instance = BroItemsModel.create({})

  expect(instance).toBeTruthy()
})
