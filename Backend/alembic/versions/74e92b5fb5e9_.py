"""empty message

Revision ID: 74e92b5fb5e9
Revises: 37b1ab945313
Create Date: 2023-03-10 01:40:53.683769

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '74e92b5fb5e9'
down_revision = '37b1ab945313'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('participant', schema=None) as batch_op:
        batch_op.create_foreign_key(None, 'public_event', ['public_event_id'], ['id'])

    with op.batch_alter_table('post', schema=None) as batch_op:
        batch_op.create_foreign_key(None, 'board', ['board_id'], ['id'])
        batch_op.create_foreign_key(None, 'user', ['author_name'], ['name'])

    with op.batch_alter_table('public_event', schema=None) as batch_op:
        batch_op.add_column(sa.Column('thumbnail_filename', sa.VARCHAR(length=200), nullable=True, comment='썸네일 파일명'))

    with op.batch_alter_table('sponsor', schema=None) as batch_op:
        batch_op.create_foreign_key(None, 'user', ['user_id'], ['id'])

    with op.batch_alter_table('startup_investing_forum_participant', schema=None) as batch_op:
        batch_op.create_foreign_key(None, 'user', ['user_id'], ['id'])
        batch_op.create_foreign_key(None, 'startup_investing_forum_event', ['event_id'], ['id'])

    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('startup_investing_forum_participant', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')

    with op.batch_alter_table('sponsor', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')

    with op.batch_alter_table('public_event', schema=None) as batch_op:
        batch_op.drop_column('thumbnail_filename')

    with op.batch_alter_table('post', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')

    with op.batch_alter_table('participant', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')

    # ### end Alembic commands ###
