"""
FiftyOne Repository Factory
| Copyright 2017-2023, Voxel51, Inc.
| `voxel51.com <https://voxel51.com/>`_
|
"""
from enum import Enum


class SortByField(Enum):
    UPDATED_AT = "updated_at"
    QUEUED_AT = "queued_at"
    COMPLETED_AT = "completed_at"
    STARTED_AT = "started_at"
    FAILED_AT = "failed_at"
    OPERATOR = "operator"


class SortDirection(Enum):
    ASCENDING = 1
    DESCENDING = -1


class DelegatedOpPagingParams:
    def __init__(
        self,
        sort_by: SortByField = SortByField.QUEUED_AT,
        sort_direction: SortDirection = SortDirection.DESCENDING,
        skip: int = 0,
        limit: int = 10,
    ):
        self.sort_by = sort_by
        self.sort_direction = sort_direction
        self.skip = skip
        self.limit = limit
