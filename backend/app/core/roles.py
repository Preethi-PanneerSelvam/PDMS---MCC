from enum import Enum

class UserRole(str, Enum):
    admin = "admin"
    operator = "operator"
    viewer = "viewer"
