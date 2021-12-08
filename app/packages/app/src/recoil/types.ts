import { RGB } from "@fiftyone/looker/src/state";
import { Field } from "@fiftyone/utilities";

export namespace State {
  export enum SPACE {
    FRAME,
    SAMPLE,
  }

  export interface Config {
    colorPool: string[];
    colorscale: string;
    gridZoom: number;
    loopVideos: string;
    notebookHeight: number;
    showConfidence: boolean;
    showIndex: boolean;
    showLabel: boolean;
    showTooltip: boolean;
    timezone: string | null;
    useFrameNumber: boolean;
  }

  export interface ID {
    $oid: string;
  }

  export interface DateTime {
    $date: number;
  }

  export interface Targets {
    [key: number]: string;
  }

  export interface Evaluation {}

  export interface Dataset {
    annotationRuns: [];
    brainRuns: [];
    classes: {
      [key: string]: string;
    };
    createdAt: DateTime;
    defaultClasses: string[];
    defaultMaskTargets: Targets;
    evaluations: {
      [key: string]: Evaluation;
    };
    frameCollectionName: string;
    frameFields: Field[];
    info: object;
    lastLoadedAt: DateTime;
    maskTargets: {
      [key: string]: Targets;
    };
    mediaType: "image" | "video";
    name: string;
    sampleCollectionName: string;
    sampleFields: Field[];
    version: string;
    _id: ID;
  }

  export interface Filter {}

  export enum TagKey {
    SAMPLE = "sample",
    LABEL = "label",
  }

  export interface Filters {
    tags?: {
      [key in TagKey]?: string[];
    };
    [key: string]: Filter;
  }

  export interface Stage {
    _cls: string;
    kwargs: [string, object][];
  }

  export interface Description {
    activeHandle: string | null;
    colorscale: RGB[];
    close: boolean;
    config: Config;
    connected: boolean;
    datasets: string[];
    dataset?: Dataset;
    filters: Filters;
    refresh: boolean;
    selected: string[];
    selectedLabels: string[];
    view: Stage[];
    viewCls: string | null;
  }
}
