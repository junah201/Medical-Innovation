from werkzeug.security import generate_password_hash, check_password_hash


def hash_password(password: str):
    return generate_password_hash(password, "sha256")


def verify_password(password: str, hashed_password: str):
    return check_password_hash(hashed_password, password)
