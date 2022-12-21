"""
FiftyOne Server ``/embeddings`` route.

| Copyright 2017-2022, Voxel51, Inc.
| `voxel51.com <https://voxel51.com/>`_
|
"""
import glob
import os
import numpy as np



from starlette.endpoints import HTTPEndpoint
from starlette.requests import Request

import eta.core.serial as etas
import eta.core.utils as etau

import fiftyone as fo
from fiftyone.server.decorators import route
import fiftyone.server.view as fosv


MAX_CATEGORIES = 100


cache = dict()

class Embeddings(HTTPEndpoint):
    @route
    async def post(self, request: Request, data: dict):

        # print(data)
        datasetName = data["dataset"]
        key = data["brainKey"]
        labels_field = data["labelsField"]
        filters = data["filters"]
        extended_stages = data["extended"]
        extended_selection = data["extendedSelection"]
        selection_mode = data["selectionMode"]
        stages = data["view"]
        dataset = fo.load_dataset(datasetName)
        print(data)

        results = dataset.load_brain_results(key)

        all_points = results.points
        all_sample_ids = results._sample_ids
    
        # This is the view loaded in the view bar
        view = fosv.get_view(datasetName, stages=stages)

        results.use_view(view, allow_missing=True)
        curr_points = results._curr_points
        curr_sample_ids = results._curr_sample_ids
        curr_label_ids = results._curr_label_ids
        label_values = results.view.values(labels_field)

        # TODO optimize count
        values_count = len(set(label_values))
        selected_ids = get_selected_ids(datasetName, filters, extended_stages, extended_selection, stages, curr_sample_ids)

        distinct_values = set(label_values)
        style = (
            "categorical"
            if len(distinct_values) <= MAX_CATEGORIES
            else "continuous"
        )

        point_ids = curr_label_ids if selection_mode == "patches" else curr_sample_ids

        zipped = zip(point_ids, curr_points, label_values)
        traces = {}
        for (id, points, label) in zipped:
            add_to_trace(traces, selected_ids, id, points, label, style)

        return {"traces": traces, "style": style, "values_count": values_count, "selected_ids": None}

def get_selected_ids(datasetName, filters, extended_stages, extended_selection, stages, curr_sample_ids):
    if filters or extended_stages:
        # There's an extended view, so select points in the extended view and
        # deselect all others
        extended_view = fosv.get_view(
            datasetName,
            stages=stages,
            filters=filters,
            extended_stages=extended_stages,
        )
        extended_ids = extended_view.values("id")
        return set(curr_sample_ids) & set(extended_ids)
    else:
        # No filter is applied, everything can be selected
        return None
    if selected_ids and extended_selection:
        return selected_ids & set(extended_selection)
    elif extended_selection:
        return set(extended_selection)

def add_to_trace(traces, selected_ids, id, points, label, style):
    key = label if style == "categorical" else "points"
    if not key in traces:
        traces[key] = []

    traces[key].append(
        {
            "id": id,
            "points": points,
            "label": label,
            "selected": id in selected_ids if selected_ids else True,
        }
    )