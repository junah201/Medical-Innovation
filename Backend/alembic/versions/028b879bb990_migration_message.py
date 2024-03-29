"""migration message

Revision ID: 028b879bb990
Revises: bf8736149de7
Create Date: 2023-05-09 01:48:56.110416

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '028b879bb990'
down_revision = 'bf8736149de7'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('judging_participant', schema=None) as batch_op:
        batch_op.create_foreign_key(None, 'user', ['user_id'], ['id'])
        batch_op.create_foreign_key(None, 'judging_event', ['event_id'], ['id'])

    with op.batch_alter_table('judging_result', schema=None) as batch_op:
        batch_op.create_foreign_key(None, 'user', ['user_id'], ['id'])
        batch_op.create_foreign_key(None, 'judging_participant', ['participant_id'], ['id'])

    with op.batch_alter_table('participant', schema=None) as batch_op:
        batch_op.create_foreign_key(None, 'public_event', ['public_event_id'], ['id'])

    with op.batch_alter_table('post', schema=None) as batch_op:
        batch_op.create_foreign_key(None, 'user', ['author_name'], ['name'])
        batch_op.create_foreign_key(None, 'board', ['board_id'], ['id'])

    with op.batch_alter_table('private_participant', schema=None) as batch_op:
        batch_op.create_foreign_key(None, 'private_event', ['event_id'], ['id'])
        batch_op.create_foreign_key(None, 'user', ['user_id'], ['id'])

    with op.batch_alter_table('sponsor', schema=None) as batch_op:
        batch_op.create_foreign_key(None, 'user', ['user_id'], ['id'])

    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('first_judging_permission', sa.BOOLEAN(), nullable=False, comment='1차 심사 권한'))
        batch_op.add_column(sa.Column('second_judging_permission', sa.BOOLEAN(), nullable=False, comment='2차 심사 권한'))

    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_column('second_judging_permission')
        batch_op.drop_column('first_judging_permission')

    with op.batch_alter_table('sponsor', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')

    with op.batch_alter_table('private_participant', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')

    with op.batch_alter_table('post', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')

    with op.batch_alter_table('participant', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')

    with op.batch_alter_table('judging_result', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')

    with op.batch_alter_table('judging_participant', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')

    # ### end Alembic commands ###
