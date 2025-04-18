import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const BroItemsModel = types
  .model("BroItems")
  .props({
    hasOnBoarded: false,
  })

  .views((store) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((store) => ({
    setHasOnBoarded(value: boolean) {
      store.hasOnBoarded = value
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface BroItems extends Instance<typeof BroItemsModel> {}
export interface BroItemsSnapshotOut extends SnapshotOut<typeof BroItemsModel> {}
export interface BroItemsSnapshotIn extends SnapshotIn<typeof BroItemsModel> {}
export const createBroItemsDefaultModel = () => types.optional(BroItemsModel, {})
