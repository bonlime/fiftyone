import onRefresh from "./onRefresh";
import onSetDataset from "./onSetDataset";
import onSetFieldVisibility from "./onSetFieldVisibility";
import onSetSimilarityParameters from "./onSetSimilarityParameters";
import onSetView from "./onSetView";
import onSetViewName from "./onSetViewName";
import registerSetter from "./registerSetter";

registerSetter("datasetName", onSetDataset);
registerSetter("fieldVisibility", onSetFieldVisibility);
registerSetter("refresh", onRefresh);
registerSetter("similarityParameters", onSetSimilarityParameters);
registerSetter("view", onSetView);
registerSetter("viewName", onSetViewName);

export { default } from "./useSetters";
